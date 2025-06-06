import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fn();

      setData(res);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  // console.log(data);

  return { data, isLoading, refetch };
};
