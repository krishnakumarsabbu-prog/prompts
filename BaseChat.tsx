/*
 * @ts-nocheck
 */
import type { JSONValue, Message } from 'ai';
import React, { type RefCallback, useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { Menu } from '~/components/sidebar/Menu.client';
import { Workbench } from '~/components/workbench/Workbench.client';
import { classNames } from '~/utils/classNames';
import { PROVIDER_LIST } from '~/utils/constants';
import { Messages } from './Messages.client';
import { getApiKeysFromCookies } from './APIKeyManager';
import Cookies from 'js-cookie';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './BaseChat.module.scss';
import { ImportButtons } from '~/components/chat/chatExportAndImport/ImportButtons';
import { ExamplePrompts } from '~/components/chat/ExamplePrompts';
import GitCloneButton from './GitCloneButton';
import type { ProviderInfo } from '~/types/model';
import StarterTemplates from './StarterTemplates';
import type { ActionAlert, SupabaseAlert, DeployAlert, LlmErrorAlertType } from '~/types/actions';
import DeployChatAlert from '~/components/deploy/DeployAlert';
import ChatAlert from './ChatAlert';
import type { ModelInfo } from '~/lib/modules/llm/types';
import ProgressCompilation from './ProgressCompilation';
import type { ProgressAnnotation } from '~/types/context';
import { SupabaseChatAlert } from '~/components/chat/SupabaseAlert';
import { expoUrlAtom } from '~/lib/stores/qrCodeStore';
import { useStore } from '@nanostores/react';
import { StickToBottom, useStickToBottomContext } from '~/lib/hooks';
import { ChatBox } from './ChatBox';
import type { DesignScheme } from '~/types/design-scheme';
import type { ElementInfo } from '~/components/workbench/Inspector';
import LlmErrorAlert from './LLMApiAlert';

const TEXTAREA_MIN_HEIGHT = 76;

export const BaseChat = React.forwardRef<HTMLDivElement, any>(
  (
    {
      textareaRef,
      showChat = true,
      chatStarted = false,
      isStreaming = false,
      onStreamingChange,
      model,
      setModel,
      provider,
      setProvider,
      providerList,
      input = '',
      enhancingPrompt,
      handleInputChange,
      enhancePrompt,
      sendMessage,
      handleStop,
      importChat,
      exportChat,
      uploadedFiles = [],
      setUploadedFiles,
      imageDataList = [],
      setImageDataList,
      messages,
      actionAlert,
      clearAlert,
      deployAlert,
      clearDeployAlert,
      supabaseAlert,
      clearSupabaseAlert,
      llmErrorAlert,
      clearLlmErrorAlert,
      data,
      chatMode,
      setChatMode,
      append,
      designScheme,
      setDesignScheme,
      selectedElement,
      setSelectedElement,
      addToolResult,
      onWebSearchResult,
    },
    ref,
  ) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

    const [apiKeys, setApiKeys] = useState(getApiKeysFromCookies());
    const [modelList, setModelList] = useState([]);
    const [isModelSettingsCollapsed, setIsModelSettingsCollapsed] = useState(false);

    const baseChat = (
      <div
        ref={ref}
        className={classNames(
          styles.BaseChat,
          'relative flex h-full w-full overflow-hidden bg-[#0B1220] text-white'
        )}
        data-chat-visible={showChat}
      >
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-3xl pointer-events-none"></div>

        <ClientOnly>{() => <Menu />}</ClientOnly>

        <div className="flex flex-col lg:flex-row overflow-y-auto w-full h-full">
          <div className="flex flex-col flex-grow h-full">

            {/* HERO SECTION */}
            {!chatStarted && (
              <div className="mt-[12vh] max-w-4xl mx-auto text-center px-4">

                {/* Logo */}
                <div className="flex justify-center items-center gap-3 mb-6">
                  <div className="text-4xl">🩺</div>
                  <div className="text-left">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                      DevCure
                    </h1>
                    <p className="text-sm text-gray-400">
                      Heal, Fix & Optimize Your Code
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-4">
                  <span className="bg-[#1f2937] px-4 py-1 rounded-full text-sm text-teal-400">
                    AI-Powered Coding Doctor
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                  Heal, Fix & Optimize
                </h1>
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  Your Code
                </h2>

                {/* Subtext */}
                <p className="text-md lg:text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
                  Your AI-powered coding doctor that diagnoses, repairs, and improves your codebase instantly.
                </p>
              </div>
            )}

            <StickToBottom className="pt-6 px-4 flex flex-col">

              <StickToBottom.Content className="flex flex-col gap-4">
                <ClientOnly>
                  {() =>
                    chatStarted ? (
                      <Messages
                        className="flex flex-col w-full max-w-4xl mx-auto"
                        messages={messages}
                        isStreaming={isStreaming}
                        append={append}
                      />
                    ) : null
                  }
                </ClientOnly>
              </StickToBottom.Content>

              {/* CHAT INPUT AREA */}
              <div className="my-auto flex flex-col gap-3 w-full max-w-3xl mx-auto mb-6">

                {/* Doctor Mode */}
                {!chatStarted && (
                  <div className="flex justify-center mb-2">
                    <div className="bg-[#111827] border border-gray-700 rounded-full p-1 flex gap-2">
                      <button className="px-4 py-1 text-sm text-gray-400">Normal</button>
                      <button className="px-4 py-1 text-sm bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full">
                        🩺 Doctor Mode
                      </button>
                    </div>
                  </div>
                )}

                <ChatBox
                  textareaRef={textareaRef}
                  input={input}
                  handleInputChange={handleInputChange}
                  isStreaming={isStreaming}
                  handleStop={handleStop}
                  handleSendMessage={sendMessage}
                  enhancingPrompt={enhancingPrompt}
                  enhancePrompt={enhancePrompt}
                  chatStarted={chatStarted}
                />
              </div>
            </StickToBottom>

            {/* ACTIONS */}
            {!chatStarted && (
              <div className="flex flex-col items-center gap-6 mb-10">

                <div className="flex gap-3 flex-wrap justify-center">
                  {ImportButtons(importChat)}
                  <GitCloneButton importChat={importChat} />
                  <button className="bg-[#111827] border border-gray-700 px-4 py-2 rounded-lg hover:border-teal-500">
                    Upload Codebase
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {ExamplePrompts((event, messageInput) => {
                    handleStop?.();
                    sendMessage?.(event, messageInput);
                  })}
                  <StarterTemplates />
                </div>

              </div>
            )}
          </div>

          <ClientOnly>
            {() => (
              <Workbench chatStarted={chatStarted} isStreaming={isStreaming} setSelectedElement={setSelectedElement} />
            )}
          </ClientOnly>
        </div>
      </div>
    );

    return <Tooltip.Provider delayDuration={200}>{baseChat}</Tooltip.Provider>;
  },
);

function ScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    !isAtBottom && (
      <button onClick={() => scrollToBottom()}>
        Go to last message
      </button>
    )
  );
}
