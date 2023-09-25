import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Toast } from "antd-mobile";

const useChatHook = (initialToken, initialThemes) => {
  const [userInput, setUserInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      msg: "您好，请问有什么可以帮到你吗 ?",
      fromUser: false,
      audioFile: "index",
    },
  ]);

  const [isShowSetting, setShowSetting] = useState(false);
  const [token, setToken] = useState(initialToken);
  const [themes, setThemes] = useState(initialThemes);

  const commands = [
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "reset",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  const host = "http://AISound.aipet.vip:8000";

  useEffect(() => {
    if (userInput !== "" && userInput != "undefined") {
      setLoading(true);
      const config = {
        headers: {
          token,
        },
      };
      axios.get(host + `/api/response?message=${userInput}`, config).then(
        (response) => {
          speechSynthesis.cancel();
          console.log(response.data);

          let utterance = new SpeechSynthesisUtterance(response.data.data.msg);
          // speechSynthesis.speak(utterance);
          speechSynthesis.speak("喵喵喵");

          let resp = response.data;
          let msg = "";
          let fileName = "";
          if (resp.status === "ok") {
            msg = resp.data.msg;
            fileName = resp.data.fileName;
            setMessages([
              ...messages,
              { msg, fromUser: false, audioFile: fileName },
            ]);
          } else {
            Toast.show({
              content: resp.msg,
            });
          }

          setUserInput("");
          resetTranscript();

          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    setUserInput(transcript);
  }, [transcript]);

  const sendMessage = () => {
    if (userInput !== "") {
      setMessages([...messages, { msg: userInput, fromUser: true }]);
    }
  };

  const handleRecording = () => {
    if (recording) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      setUserInput("");
      SpeechRecognition.startListening({ language: "zh-CN", continuous: true });
    }
    setRecording(!recording);
  };

  function onSetting() {
    setShowSetting(true);
  }

  function onSettingMaskClick() {
    setShowSetting(false);
  }

  return {
    userInput,
    setUserInput,
    recording,
    handleRecording,
    loading,
    messages,
    sendMessage,
    isShowSetting,
    onSetting,
    onSettingMaskClick,
    token,
    setToken,
    themes,
    setThemes,
    bottomRef,
    browserSupportsSpeechRecognition,
  };
};

export default useChatHook;
