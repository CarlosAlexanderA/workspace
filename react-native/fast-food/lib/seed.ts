import {File, Paths} from 'expo-file-system';
import {ID} from 'react-native-appwrite';
import {appwriteConfig, databases, storage} from './appwrite';
import dummyData from './data';

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: 'topping' | 'side' | 'size' | 'crust' | string; // extend as needed
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[]; // list of customization names
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(tableId: string): Promise<void> {
  const list = await databases.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: tableId,
  });

  await Promise.all(
    list.rows.map((doc) =>
      databases.deleteRow({
        databaseId: appwriteConfig.databaseId,
        tableId: tableId,
        rowId: doc.$id,
      })
    )
  );
}

async function clearStorage(): Promise<void> {
  const list = await storage.listFiles({bucketId: appwriteConfig.bucketId});

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile({bucketId: appwriteConfig.bucketId, fileId: file.$id})
    )
  );
}

async function uploadImageToStorage(imageUrl: string) {
  const fileName = `img-${Date.now()}.jpg`;

  // create temporal directory
  const dir = new File(Paths.cache, fileName);

  // doownload image (URL -> file://)
  const downloadedFile = await File.downloadFileAsync(imageUrl, dir);

  // console.log('Local Image: ', JSON.stringify(downloadedFile, null, 2));

  try {
    // upload to appwrite storage (file:// -> appwrite storage)
    const file = await storage.createFile({
      bucketId: appwriteConfig.bucketId,
      fileId: ID.unique(),
      file: {
        uri: downloadedFile.uri,
        name: fileName,
        type: downloadedFile.type || 'image/jpeg',
        size: downloadedFile.size,
      } as any,
    });
    // console.log(file);

    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
  } catch (error) {
    console.error('ERROR createImage:', JSON.stringify(error, null, 2));
    throw error;
  } finally {
    // Cleanup - delete temporal directory
    await dir.delete();
  }
}

async function seed(): Promise<void> {
  console.log('🚩 Start Seeding');

  // 1. Clear all
  await clearAll(appwriteConfig.categoriesTableId);
  await clearAll(appwriteConfig.customizationsTableId);
  await clearAll(appwriteConfig.menuTableId);
  await clearAll(appwriteConfig.menu_customizationsTableId);
  await clearStorage();

  // 2. Create Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    const doc = await databases.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTableId,
      rowId: ID.unique(),
      data: cat,
    });
    categoryMap[cat.name] = doc.$id;
  }

  // 3. Create Customizations
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const doc = await databases.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.customizationsTableId,
      rowId: ID.unique(),
      data: {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      },
    });
    customizationMap[cus.name] = doc.$id;
  }

  // 4. Create Menu Items
  const menuMap: Record<string, string> = {};

  for (const item of data.menu) {
    const uploadedImage = await uploadImageToStorage(item.image_url);
    // console.log('categories', categoryMap[item.category_name]);

    const doc = await databases.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTableId,
      rowId: ID.unique(),
      data: {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        price: item.price,
        categories: categoryMap[item.category_name],
      },
    });

    menuMap[item.name] = doc.$id;

    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      await databases.createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.menu_customizationsTableId,
        rowId: ID.unique(),
        data: {
          menu: doc.$id,
          customizations: customizationMap[cusName],
        },
      });
    }
  }

  console.log('✅ Seeding complete.');
}

export default seed;
