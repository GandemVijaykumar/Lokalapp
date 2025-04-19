// screens/JobsScreen.js
import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import JobCard from '../components/jobcard';
import { fetchJobs } from '../utils/api';

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch jobs when the screen mounts
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newJobs = await fetchJobs(page);
      if (newJobs.length === 0) {
        console.log('No more jobs to load.');
        return;
      }
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  // Render error message if there's an error
  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Render the list of jobs */}
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => `${item.id || 'fallback'}-${index}`} // Ensure unique keys
        renderItem={({ item }) => <JobCard job={item} />}
        onEndReached={loadJobs} // Load more jobs when reaching the end
        onEndReachedThreshold={0.5} // Trigger loading when halfway through the list
        ListFooterComponent={loading && <ActivityIndicator />} // Show loading indicator
        ListEmptyComponent={
          !loading && <Text style={{ textAlign: 'center', marginTop: 20 }}>No jobs available</Text>
        }
      />
    </View>
  );
}