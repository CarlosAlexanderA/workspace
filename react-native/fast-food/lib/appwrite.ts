import {CreateUserParams, GetMenuParams, SignInParams} from '@/type';
import {
  Account,
  Avatars,
  Client,
  ID,
  Query,
  Storage,
  TablesDB,
} from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: 'com.alex.foodordering',
  databaseId: '69169504001b21825ef0',
  bucketId: '6944b20b002ebce41007',
  userTableId: 'user',
  categoriesTableId: 'categories',
  menuTableId: 'menu',
  customizationsTableId: 'customizations',
  menu_customizationsTableId: 'menu_customizations',
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new TablesDB(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    if (!newAccount) throw Error;

    await signIn({email, password});

    const avatarUrl = avatars.getInitialsURL(name);

    const newUser = await databases.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      rowId: ID.unique(),
      data: {
        email,
        name,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({email, password}: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({email, password});
    console.log(session);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      queries: [Query.equal('accountId', (await currentAccount).$id)],
    });

    if (!currentUser) throw Error;

    return currentUser.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const getMenu = async ({category, query}: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal('categories', category));
    if (query) queries.push(Query.search('name', query));

    const menus = await databases.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTableId,
      queries,
    });

    return menus.rows;
  } catch (error) {
    console.log(Error);
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTableId,
    });
    return categories.rows;
  } catch (error) {
    throw new Error(error as string);
  }
};
