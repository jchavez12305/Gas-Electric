export const getSavedStationIds = () => {
    const savedStationIds = localStorage.getItem('saved_stations')
      ? JSON.parse(localStorage.getItem('saved_stations'))
      : [];
  
    return savedStationIds;
  };
  
  export const saveStationIds = (stationIdArr) => {
    if (stationIdArr.length) {
      localStorage.setItem('saved_stations', JSON.stringify(stationIdArr));
    } else {
      localStorage.removeItem('saved_stations');
    }
  };
  
  export const removeStationId = (stationId) => {
    const savedStationIds = localStorage.getItem('saved_stations')
      ? JSON.parse(localStorage.getItem('saved_stations'))
      : null;
  
    if (!savedStationIds) {
      return false;
    }
  
    const updatedSavedStationIds = savedStationIds?.filter((savedStationId) => savedStationId !== stationId);
    localStorage.setItem('saved_stations', JSON.stringify(updatedSavedStationIds));
  
    return true;
  };
  