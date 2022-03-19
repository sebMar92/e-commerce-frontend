import CardHome from "./CardHome";

export default function RenderSearch({ array }) {
  console.log(array);
  array.map((i) => {
    return <CardHome image={i.image} title={i.title} price={i.price} />;
  });
}
