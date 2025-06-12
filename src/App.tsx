import styles from "./App.module.css";
import { Alert } from "./components/Alert/Alert";
import { Footer } from "./components/Footer/Footer";
import { Form } from "./components/Form/Form";
import { Spinner } from "./components/Spinner/Spinner";
import { WeatherDetail } from "./components/WeatherDetail/WeatherDetail";
import { useWeather } from './hooks/useWeather';

export const App = () => {
  const { loading, weather, notFound, fetchWeather, hasWeatherData } = useWeather();

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <h1 className={styles.title}>Buscador de Clima</h1>
        <div className={styles.container}>
          <Form fetchWeather={fetchWeather} />
          {loading && <Spinner />}
          {hasWeatherData && <WeatherDetail weather={weather} />}
          {notFound && <Alert>Ciudad No Encontrada</Alert>}
        </div>
      </main>
      <Footer />
    </div>
  );
};
