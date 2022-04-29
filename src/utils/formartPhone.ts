export default function formatPhone(telephone: string){

  const regex = /([0-9]{2})([0-9]{5})([0-9]{4})/gi;

  const formattedPhone = telephone?.replace(regex, "($1) $2-$3");

  return formattedPhone;
}
