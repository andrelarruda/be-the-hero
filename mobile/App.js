// o intl não funciona no iOS. Portanto deve-se instalar o pacote 'intl' e depois importá-lo aqui. (DESCOMENTE AS DUAS PRÓXIMAS LINHAS PARA FUNCIONAR NO iOS)
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import Routes from "./src/routes";

export default function App() {
   return <Routes />;
}
