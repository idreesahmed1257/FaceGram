export const handleDate = date => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const day = new Date(date).getDate();
  const month = months[new Date(date).getMonth()];
  const year = new Date(date).getFullYear();
  return `${day} ${month} ${year}`;
};


export const handleName = name => {
  return name?.charAt(0)?.toUpperCase();
};

export const handleNameUpperCase = name => {
  if(!name) return '';
  const words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0]?.toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");;
}