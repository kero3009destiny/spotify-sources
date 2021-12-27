import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import Layout from "../components/layout"
import Title from "../components/atoms/title"
import Text from "../components/atoms/text"
import VideoContainer from "../components/atoms/videoContainer"
import ResponsiveIframe from "../components/atoms/responsiveIframe"

const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta
          property="og:url"
          content="https://escutaaasminas.byspotify.com/"
        />
        <meta property="og:type" content="Homepage" />
        <meta property="og:title" content="Homepage | Escuta as Minas" />
        <title>Homepage | Escuta as Minas</title>
        <meta
          name="keywords"
          content="Casa de Música, Casa Spotify, estúdio spotify, Spotify Mulheres, Escuta as Minas, casa de música escuta as minas, Natura Musical, #escutaaasminas, música empoderamento feminino , concurso spotify, concurso cantoras, nextup youtube, edital spotify"
        />
        <meta
          property="og:description"
          content="A Casa de Música Escuta As Minas do Spotify, feita POR mulheres e PARA mulheres, nasceu pra facilitar a troca entre artistas ascensão com outras profissionais mulheres e tem inscrições abertas para escolha de mais 12 artistas até dia 28/08/2019."
        />
        <meta property="og:image" content="cover.png" />
      </Helmet>

      <Title style={{ marginTop: 50 }}>Escuta As Minas</Title>
      <Text>
        Evocamos as pioneiras e agora nos aproximamos da nova geração para que
        possamos fazer novas pontes e criar novos caminhos para aumentar o
        espaço para as mulheres.
      </Text>
      <br />
      <Title>A Casa</Title>
      <Text>
        Em 2019, a Casa de Música Escuta As Minas, feita por mulheres e para
        mulheres, nasceu pra facilitar a troca e as conexões entre artistas em
        início de carreira com produtoras que já conquistaram espaço no mercado,
        grandes nomes da música nacional, as madrinhas, e toda uma rede para
        apoiar novos talentos em diversas áreas da indústria. Foram 24 artistas,
        12 produtoras e uma música produzida por semana durante seis meses, em
        São Paulo (SP).
      </Text>
      <Text>
        Negra Li, Priscilla Alcantara, Liniker e Maiara & Maraisa conferiram de
        perto o trabalho feito pelas produtoras Mayra Maldjian, Mônica Agena,
        Mahmundi, Daniela Araújo, Lan Lahn, Maria Beraldo, Naná Rizzini, Natalia
        Carrera, Sue Andrade, Badsista, Rosie Mankato, e Apuke. Cada uma delas
        produziu ao lado das artistas selecionadas: Souto MC, Bibi Caetano, The
        Mönic, Luana Marques, Ni Munhoz, Samantha Machado, Barbara Amorim, Ludi,
        Urias, Nina Oliveira, Marujos, 1lum3, Indy Naíse, Déborah Crespo, Brunna
        Carvalho, Andressa Hayalla, Funmilayo Afrobeat Orquestra, Rebeca, Jup do
        Bairro, Karol de Souza, Ana Olic, Amanda Magalhães, Marvilla e MC Lynne.
      </Text>
      <Text>
        Foram mais de 10 gêneros musicais produzidos, entre eles rap, sertanejo,
        pop, funk, gospel, MPB, samba e música eletrônica.
      </Text>
      <Text>
        Foram 9 workshops com profissionais da indústria como Claudia Assef,
        Veronica Pessoa, Isabel Murat, Naná Rizzini, Ana Morena, Mariá Portugal,
        Florencia Akamine, Elisa Gargiulo, Joema Martins, Flávia Biggs, Camila
        Garófalo, Renata Gomes, Nathália Cabral, Lila e Fernanda Pereira.
      </Text>
      <br />
      <Text>
        Todas as músicas produzidas estão disponíveis na playlist Escuta As
        Minas no Spotify.{" "}
      </Text>
      <Text>
        Por mais mulheres na música. Por mais mulheres sendo ouvidas.{" "}
      </Text>
      <Text style={{ fontWeight: "bold" }}>#EscutaAsMinas</Text>

      <EpisoteTitle>Episódio 1</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/b9uCx1VTfYw?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 2</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/I-mjjgXbWVE?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 3</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/yPZbfO-su9M?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 4</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/kGglUTp_6xk?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 5</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/WUo1hWRKKlo?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 6</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/RQ2U5IaPc54?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 7</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/1y3FZRprboc?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 8</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/xumZSU561No?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 9</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/tiH3UfWh_RQ?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 10</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/hqMgaDvkGfU?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 11</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/mOXRJ72PDKo?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 12</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/M2YkMW5OJ6o?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 13</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/eg5v-GF0bcM" />
      </VideoContainer>
      <EpisoteTitle>Episódio 14</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/VhVxa7I2vgM" />
      </VideoContainer>
      <EpisoteTitle>Episódio 15</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/U9eIVQCZrTg" />
      </VideoContainer>
      <EpisoteTitle>Episódio 16</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/K-nqpszKqWo" />
      </VideoContainer>
      <EpisoteTitle>Episódio 17</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/tCIWQLBo3P4" />
      </VideoContainer>
      <EpisoteTitle>Episódio 18</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/HvICc0432_8" />
      </VideoContainer>
      <EpisoteTitle>Episódio 19</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/SXb-xrL6Qeo?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 20</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/KimSQ23mMQI" />
      </VideoContainer>
      <EpisoteTitle>Episódio 21</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/pLqoStpEU4o?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 22</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/HWxwA2Slr7c?list=PL90DA4TmHOcanStdsMHnkMWdCcapmsYAZ" />
      </VideoContainer>
      <EpisoteTitle>Episódio 23</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/4pZKzu_vI5Y" />
      </VideoContainer>
      <EpisoteTitle>Episódio 24</EpisoteTitle>
      <VideoContainer>
        <ResponsiveIframe src="https://www.youtube.com/embed/kdlvE1jYhdE" />
      </VideoContainer>
    </Layout>
  )
}

export default IndexPage

const EpisoteTitle = styled(Title)`
  margin: 0;
  font-size: 25px;
`
