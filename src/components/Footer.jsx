import React, { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState(null);

  useEffect(() => {
    let newDate = new Date();
    let year = newDate.getFullYear();

    setYear(year);
  }, []);

  return (
    <p className="text-gray-700 dark:text-gray-200 text-center m-20">
      {year} - NRN - Gestora de Leilões e Publicidade - Feito com ❤️ por VCA
    </p>
  );
};

export default Footer;
