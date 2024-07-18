import Headers from "@/components/Headers";

export default function CartLayout({ children }) {
  return (
    <>
      <Headers />
      {children}
    </>
  );
}
