import React, { useState, useEffect } from "react";
// pq usar o TouchableOpacity ao invés do Button? Pq o Button já vem com algumas estilizações próprias. Jà o TouchableOpacity torna qualquer coisa clicável e quando clicamos ele tira um pouco a opacidade do elemento.
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";
import styles from "./styles";

import api from "../../services/api";

export default function Incidents() {
   const [incidents, setIncidents] = useState([]);
   const [total, setTotal] = useState(0);
   const [page, setPage] = useState(1);
   // armazena a informação de quando estiver buscando dados novos. Pra evitar que esses dados sejam buscados novamente. Carregar uma página por vez.
   const [loading, setLoading] = useState(false);

   const navigation = useNavigation();

   // recebe como parâmetro o caso que clicou
   function navigateToDetail(incident) {
      // recebe como 1º param o nome dado à rota (routes.js)
      // recebe como 2º param um objeto contendo todos os dados que serão enviados para a página para a qual está navegando (Detail).
      navigation.navigate("Detail", { incident });
   }

   async function loadIncidents() {
      if (loading) {
         return;
      }

      // para não ir buscar informações quando a lista já estiver sido completamente carregada.
      if (total > 0 && incidents.length === total) {
         return;
      }
      setLoading(true);

      const response = await api.get("incidents", {
         params: {
            page
         }
      });

      // faz a 'soma' da lista que contém os elementos atuais com a que foi buscada pela api. Evitando que durante a busca por uma próxima página a lista de incidents com as páginas anteriores seja sobrescrita.
      setIncidents([...incidents, ...response.data.incidents]);
      setTotal(response.headers["x-total-count"]);
      setPage(page + 1);
      setLoading(false);
   }

   useEffect(() => {
      loadIncidents();
   }, []);

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
               Total de <Text style={styles.headerTextBold}>{total} casos</Text>
               .
            </Text>
         </View>
         <Text style={styles.title}>Bem Vindo!</Text>
         <Text style={styles.description}>
            Escolha um dos casos abaixo e salve o dia.
         </Text>

         <FlatList
            // O array de dados que vai montar a lista.
            data={incidents}
            // o style da lista também vai no FlatList
            style={styles.incidentList}
            // o valor único que identifica cada elemento da lista (prop data)
            keyExtractor={incident => String(incident.id)}
            // Para mostrar a barra de scroll ou não
            showsVerticalScrollIndicator={true}
            // atributo determina o que fazer quando chegar ao final da lista
            onEndReached={loadIncidents}
            // atributo determina a quantos porcentos do final da lista a função declarada em onEndReached deve ser disparada.
            onEndReachedThreshold={0.2}
            // Função responsável por renderizar cada um dos ítens da lista (retorna um código JSX, por isso usam-se os parênteses, não chaves)
            //essa recebe vários parâmetros. Um deles é o item. Que é cada elemento que será iterado. Neste caso ele foi renomeado para incident.
            renderItem={({ item: incident }) => (
               <View style={styles.incident}>
                  <Text style={styles.incidentProperty}>ONG:</Text>
                  <Text style={styles.incidentValue}>{incident.name}</Text>

                  <Text style={styles.incidentProperty}>CASO:</Text>
                  <Text style={styles.incidentValue}>{incident.title}</Text>

                  <Text style={styles.incidentProperty}>VALOR:</Text>
                  <Text style={styles.incidentValue}>
                     {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                     }).format(incident.value)}
                  </Text>

                  <TouchableOpacity
                     style={styles.detailsButton}
                     onPress={() => navigateToDetail(incident)}
                  >
                     <Text style={styles.detailsButtonText}>
                        Ver mais detalhes
                     </Text>
                     <Feather name="arrow-right" size={16} color="#E02041" />
                  </TouchableOpacity>
               </View>
            )}
         />
      </View>
   );
}
