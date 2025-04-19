// utils/api.js
export const fetchJobs = async (page = 1) => {
    try {
      const url = `https://testapi.getlokalapp.com/common/jobs?page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return processJobs(data.results || []);
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
      return [];
    }
  };
  
  export const processJobs = (jobs) => {
    return jobs.map((job, index) => ({
      id: job.id || `fallback-id-${index}`, // Fallback ID
      title: decodeUnicode(job.title),
      location: decodeUnicode(job.primary_details?.Place || 'Location Not Specified'),
    }));
  };
  
  export const decodeUnicode = (text) => {
    try {
      // Remove invalid Unicode characters (U+0000 to U+001F)
      const sanitizedText = (text || '').replace(/[\u0000-\u001F]/g, '');
      return decodeURIComponent(JSON.parse(`"${sanitizedText}"`));
    } catch (error) {
      console.error('Error decoding Unicode:', error);
      return text || ''; // Return original text or empty string if decoding fails
    }
  };