import Headers from "@/components/Headers";

export default function ShopLayout({ children }) {
  return (
    <>
      <Headers />
      {children}
    </>
  );
}
