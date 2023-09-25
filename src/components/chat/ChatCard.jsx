import React, { useRef } from "react";
import useChatHook from "./useChatHook";
import Aud from "./AudioPlayer";

export default function ChatCard() {
  // 初始token和themes
  const initialToken = "1c98aa19e8e27ba0a49c5dca57d16d2d";
  const initialThemes = {
    primaryColor: "#475569",
    secondryColor: "#475569",
    primaryFontColor: "white",
    secondryFontColor: "#2C3333",
    logoColor: "#E7F6F2",
  };

  // 使用自定义Hook来处理逻辑
  const {
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
  } = useChatHook(initialToken, initialThemes);

  return (
    <div className="pr-4 ">
      <div className=" flex-1 overflow-y-scroll h-[300px]">
        <div
          className="max-w-2xl mx-auto space-y-12 grid grid-cols-1 overflow-y-auto scroll-smooth scrollbar-hide overflow-x-hidden"
          style={{ maxHeight: "30rem" }}
        >
          {loading && (
            <div className="flex justify-center items-center">
              {/* <Dna
                visible={true}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              /> */}
            </div>
          )}
          <ul>
            {messages &&
              messages.map((message, idx) => {
                return (
                  <div
                    key={idx}
                    className={`mt-3 ${
                      message.fromUser
                        ? "place-self-end text-right"
                        : "place-self-start text-left"
                    }`}
                  >
                    <div
                      className="mt-3  p-3 rounded-2xl"
                      style={{
                        backgroundColor: message.fromUser
                          ? themes.primaryColor
                          : "white",
                        color: message.fromUser
                          ? themes.primaryFontColor
                          : themes.secondryFontColor,
                        borderTopLeftRadius: !message.fromUser && 0,
                        borderTopRightRadius: message.fromUser && 0,
                      }}
                    >
                      <p className="break-words text-md">
                        {message.fromUser ? message.msg : message.msg}

                        {/* Aud display */}
                        {/* {!message.fromUser && (
                          <Aud
                            value={
                              message.audioFile == "undefined"
                                ? ""
                                : message.audioFile
                            }
                          />
                        )} */}
                      </p>
                    </div>
                  </div>
                );
              })}
          </ul>
          <div ref={bottomRef} />
        </div>
      </div>
      <div className={`w-full`}>
        <div className="justify-end items-center bg-white rounded-xl flex 2xl:mx-96 my-3">
          <input
            className="p-3 bg-white w-full rounded-l-md border-0 outline-none text-black"
            placeholder="请输入您的问题..."
            type="text"
            id="message"
            name="message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="bg-white px-4 text-black"
            disabled={!browserSupportsSpeechRecognition}
            onClick={handleRecording}
          >
            {/* {recording ? (
              <img className="w-10" src={mic_on} alt="mic"></img>
            ) : (
              <img className="w-10" src={mic} alt="mic"></img>
            )} */}
            {recording ? <p>录音中</p> : <p>录音</p>}
          </button>
          <button
            style={{ backgroundColor: themes.secondryColor }}
            className={`p-4 rounded-r-xl`}
            onClick={sendMessage}
          >
            {/* <img className="w-8" src={arrow} alt="arrow" /> */}发送
          </button>
        </div>
      </div>
    </div>
  );
}
