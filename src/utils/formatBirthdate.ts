export default function formatBirthdate(date: string){

  const regex = /([0-9]{2})([0-9]{2})([0-9]{4})/g;

  const formattedPhone = date?.replace(regex, "$1/$2/$3");

  return formattedPhone;
}
