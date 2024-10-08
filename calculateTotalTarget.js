// Function to calculate total target based on the given date range and annual target
function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Helper function to get number of days in a month
    function daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }
  
    // Helper function to get working days excluding Fridays and Saturdays
    function getWorkingDaysExcludingFridays(year, month) {
      const daysInThisMonth = daysInMonth(year, month);
      let workingDays = 0;
  
      for (let day = 1; day <= daysInThisMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dayOfWeek = currentDate.getDay();
        // Exclude Fridays (5) and Saturdays (6)
        if (dayOfWeek !== 5 && dayOfWeek !== 6) {
          workingDays++;
        }
      }
      return workingDays;
    }
  
    // Helper function to get the days worked in the range, excluding Fridays and Saturdays
    function getDaysWorkedExcludingFridays(year, month, start, end) {
      const daysInThisMonth = daysInMonth(year, month);
      let workedDays = 0;
  
      for (let day = 1; day <= daysInThisMonth; day++) {
        const currentDate = new Date(year, month, day);
        if (currentDate >= start && currentDate <= end) {
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6) {
            workedDays++;
          }
        }
      }
      return workedDays;
    }
  
    // Object to store results
    const result = {
      daysExcludingFridays: [],
      daysWorkedExcludingFridays: [],
      monthlyTargets: [],
      totalTarget: 0,
    };
  
    let totalWorkingDaysInRange = 0;
    let totalWorkedDaysInRange = 0;
    
    // Loop through each month in the range
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
  
      const workingDays = getWorkingDaysExcludingFridays(year, month);
      const workedDays = getDaysWorkedExcludingFridays(year, month, start, end);
  
      result.daysExcludingFridays.push(workingDays);
      result.daysWorkedExcludingFridays.push(workedDays);
  
      totalWorkingDaysInRange += workingDays;
      totalWorkedDaysInRange += workedDays;
  
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentDate.setDate(1);
    }
  
    // Calculate the monthly targets based on proportion of worked days
    const dailyTarget = totalAnnualTarget / totalWorkingDaysInRange;
    result.daysWorkedExcludingFridays.forEach((daysWorked) => {
      const monthlyTarget = daysWorked * dailyTarget;
      result.monthlyTargets.push(monthlyTarget);
      result.totalTarget += monthlyTarget;
    });
  
    return result;
  }
  
  // Export the function for use in other modules
  module.exports = {
    calculateTotalTarget,
  };
  
  // Example usage (if running as standalone):
  if (require.main === module) {
    const startDate = '2024-01-01';
    const endDate = '2024-02-30';
    const totalAnnualTarget = 120000;
  
    const targetData = calculateTotalTarget(startDate, endDate, totalAnnualTarget);
    console.log(targetData);
  }
  