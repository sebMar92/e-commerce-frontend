import { useLocation } from "react-router-dom";

export default function useURLqueries() {
  const locationQueries = useLocation().search;
  const decodedQueries = decodeURI(locationQueries); //decodifica la url (cambios tales como reemplazar "%" por espacios)
  const splittedQueries = decodedQueries.split(/[?&]/gi); //divide la string tanto en "?" como en "&"
  const queriesNoEmptyElements = splittedQueries.filter((query) => query !== ""); //remueve el primer elemento que siempre es vacío
  const queryArray = queriesNoEmptyElements.map((e) => {
    //queriesNoEmptyElements tiene formato: ["categoryId=1", "offset=3", ...]
    const split = e.split("="); //divide el string en dos partes
    return {
      [split[0]]: split[1], //retorna {categoryId: 1}
    };
  });
  const queryObjects = Object.assign({}, ...queryArray); //junta los elementos como un objeto ["categoryId=1", "offset=3", ...] => {categoryId: 1, offset: 3, ...}
  return queryObjects;
}
