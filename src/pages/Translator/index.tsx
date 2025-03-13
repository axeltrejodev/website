import { ChangeEvent, useEffect, useState } from "react";
import useTranslation from "./hooks/useTranslation";
import "./index.css";

function Translator() {
  useEffect(() => {
    document.title = "Axel Trejo - Translator";
  }, []);
  const { translation, updateTranslation } = useTranslation();
  const [from, setFrom] = useState("auto");
  const [to, setTo] = useState("en-US");
  const [text, setText] = useState("");
  const handleChangeFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFrom = e.currentTarget.value;
    setFrom(newFrom);
    updateTranslation(newFrom, to, text);
  };
  const handleChangeTo = (e: ChangeEvent<HTMLSelectElement>) => {
    const newTo = e.currentTarget.value;
    setTo(newTo);
    updateTranslation(from, newTo, text);
  };
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.currentTarget.value;
    setText(newText);
    updateTranslation(from, to, newText);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(translation);
  };
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translation);
    utterance.lang = to;
    speechSynthesis.speak(utterance);
  };
  return (
    <>
      <h1>Translator</h1>
      <section className="translator">
        <section className="original">
          <select onChange={handleChangeFrom} value={from}>
            <option value="auto">Auto</option>
            {to != "en-US" && <option value="en-US">English</option>}
            {to != "es-ES" && <option value="es-ES">Spanish</option>}
            {to != "de-DE" && <option value="de-DE">German</option>}
            {to != "pt-BR" && <option value="pt-BR">Portuguese</option>}
          </select>
          <textarea
            placeholder="Type something..."
            onChange={handleChangeText}
            value={text}
            rows={10}
            lang={from}
          />
        </section>
        <section className="translated">
          <select onChange={handleChangeTo} value={to}>
            {from != "en-US" && <option value="en-US">English</option>}
            {from != "es-ES" && <option value="es-ES">Spanish</option>}
            {from != "de-DE" && <option value="de-DE">German</option>}
            {from != "pt-BR" && <option value="pt-BR">Portuguese</option>}
          </select>
          <textarea
            placeholder="Translation"
            rows={10}
            disabled
            value={translation}
            lang={to}
          />
          <div className="actions">
            <button onClick={handleCopy}>
              <i className="ri-clipboard-line" />
            </button>
            <button onClick={handleSpeak}>
              <i className="ri-volume-up-line" />
            </button>
          </div>
        </section>
      </section>
    </>
  );
}

export default Translator;
