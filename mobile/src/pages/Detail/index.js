import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
   View,
   FlatList,
   TouchableOpacity,
   Image,
   Text,
   Linking
} from "react-native";

import * as MailComposer from "expo-mail-composer";

import styles from "./styles";

import logoImg from "../../assets/logo.png";

export default function Detail() {
   const navigation = useNavigation();

   // useRoute serve para pegar informações específicas da página atual de navegação. Ex.: parametros que foram passados na nevegação para esta página.
   const route = useRoute();

   const incident = route.params.incident;
   const message = `Olá ${
      incident.name
   }, estou entrando em contato pois gostaria de ajudar no caso "${
      incident.title
   }" com o valor de ${Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
   }).format(incident.value)}.`;

   //1:21:13
   function navigateBack() {
      navigation.goBack();
   }

   // Pacote do próprio expo (também funciona em projetos que não usam expo) para compor emails.
   function sendMail() {
      MailComposer.composeAsync({
         subject: `Heróis do caso: ${incident.title}`,
         recipients: [incident.email],
         body: message
      });
   }

   // Classe Linking (do próprio react-native) serve para linkar a aplicação com aplicativos do celular (fazendo 'deep linking')
   function sendWhatsapp() {
      Linking.openURL(
         `whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`
      );
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Image source={logoImg} />
            <TouchableOpacity onPress={navigateBack}>
               <Feather name="arrow-left" size={28} color="#E82041" />
            </TouchableOpacity>
         </View>

         <View style={styles.incident}>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>
               ONG:
            </Text>
            <Text style={styles.incidentValue}>
               {incident.name} ({incident.city}/{incident.uf})
            </Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={[styles.incidentValue, { fontWeight: "bold" }]}>
               {incident.title}
            </Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
               {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
               }).format(incident.value)}
            </Text>
         </View>

         <View style={styles.contactBox}>
            <Text style={styles.heroeTitle}>Salve o dia!</Text>
            <Text style={styles.heroeTitle}>Seja o herói desse caso!</Text>

            <Text style={styles.heroeDescription}>Entre em contato:</Text>

            <View style={styles.actions}>
               <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                  <Text style={styles.actionText}>WhatsApp</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.action} onPress={sendMail}>
                  <Text style={styles.actionText}>Email</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}
