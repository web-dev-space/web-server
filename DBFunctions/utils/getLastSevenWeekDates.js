export default function getLastSevenWeekDates() {
  const dates = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    // Calculate past week date
    const pastWeekDate = new Date(today);
    pastWeekDate.setDate(today.getDate() - 7 * i);

    // Format the date as 'M/D'
    const formattedDate = `${pastWeekDate.getMonth() + 1}/${pastWeekDate.getDate()}`;

    // Add it to our array of dates
    dates.push(formattedDate);
  }

  return dates;
}