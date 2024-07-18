import Headers from "@/components/Headers";

export default function ShopLayout({ children }) {
  return (
    <div className="w-full h-full">
      <Headers />
      {children}
    </div>
  );
}
