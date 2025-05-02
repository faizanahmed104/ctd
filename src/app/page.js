import Image from "next/image";
import Home from "./(site)/home/page";
import HomeLayout from "./Layouts/MainLayout";

export default function page() {
  return (
    <HomeLayout headerTitle={""}>
      <Home />
    </HomeLayout>
  );
}
