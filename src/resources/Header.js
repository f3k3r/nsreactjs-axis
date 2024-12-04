import { useEffect } from "react";
import PageData from "../hooks/PageData";

export default function Header() {
  const { data, loading, error } = PageData();

  useEffect(() => {
    if (data) {
      
    }
  }, [data]);
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (!data || !data.header) {
    return <div>No header available</div>; 
  }

  return (
    <header>
        <img src={data.header} width="100%" alt="Company logo" />
    </header>
  );
}
