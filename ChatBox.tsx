import React from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { classNames } from '~/utils/classNames';
import { PROVIDER_LIST } from '~/utils/constants';
import { ModelSelector } from '~/components/chat/ModelSelector';
import { APIKeyManager } from './APIKeyManager';
import { LOCAL_PROVIDERS } from '~/lib/stores/settings';
import FilePreview from './FilePreview';
import { ScreenshotStateManager } from './ScreenshotStateManager';
import { SendButton } from './SendButton.client';
import { IconButton } from '~/components/ui/IconButton';
import { toast } from 'react-toastify';
import { SpeechRecognitionButton } from '~/components/chat/SpeechRecognition';
import { SupabaseConnection } from './SupabaseConnection';
import { ExpoQrModal } from '~/components/workbench/ExpoQrModal';
import type { ProviderInfo } from '~/types/model';
import { ColorSchemeDialog } from '~/components/ui/ColorSchemeDialog';
import type { DesignScheme } from '~/types/design-scheme';
import type { ElementInfo } from '~/components/workbench/Inspector';
import { McpTools } from './MCPTools';
import { WebSearch } from './WebSearch.client';

export const ChatBox: React.FC<any> = (props) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">

      {/* GLASS CONTAINER */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4">

        {/* MODEL SELECTOR */}
        <ClientOnly>
          {() => (
            <div className={props.isModelSettingsCollapsed ? 'hidden' : 'mb-3'}>
              <ModelSelector
                model={props.model}
                setModel={props.setModel}
                modelList={props.modelList}
                provider={props.provider}
                setProvider={props.setProvider}
                providerList={props.providerList || PROVIDER_LIST}
                apiKeys={props.apiKeys}
                modelLoading={props.isModelLoading}
              />

              {props.provider &&
                !LOCAL_PROVIDERS.includes(props.provider.name) && (
                  <APIKeyManager
                    provider={props.provider}
                    apiKey={props.apiKeys[props.provider.name] || ''}
                    setApiKey={(key) => {
                      props.onApiKeysChange(props.provider.name, key);
                    }}
                  />
                )}
            </div>
          )}
        </ClientOnly>

        {/* FILE PREVIEW */}
        <FilePreview
          files={props.uploadedFiles}
          imageDataList={props.imageDataList}
          onRemove={(index) => {
            props.setUploadedFiles?.(props.uploadedFiles.filter((_, i) => i !== index));
            props.setImageDataList?.(props.imageDataList.filter((_, i) => i !== index));
          }}
        />

        {/* TEXTAREA */}
        <div className="relative mt-2">
          <textarea
            ref={props.textareaRef}
            className="w-full bg-transparent text-white placeholder-gray-400 p-4 pr-20 rounded-xl outline-none resize-none border border-white/10 focus:border-teal-400 transition"
            placeholder="🩺 Describe your issue, paste code, or ask DevCure..."
            value={props.input}
            onChange={(e) => props.handleInputChange?.(e)}
            onPaste={props.handlePaste}
            style={{
              minHeight: props.TEXTAREA_MIN_HEIGHT,
              maxHeight: props.TEXTAREA_MAX_HEIGHT,
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                props.handleSendMessage?.(event);
              }
            }}
          />

          {/* SEND BUTTON */}
          <ClientOnly>
            {() => (
              <div className="absolute right-3 bottom-3">
                <SendButton
                  show={props.input.length > 0}
                  isStreaming={props.isStreaming}
                  onClick={(e) => props.handleSendMessage?.(e)}
                />
              </div>
            )}
          </ClientOnly>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-between items-center mt-3 flex-wrap gap-2">

          {/* LEFT ACTIONS */}
          <div className="flex gap-2 items-center flex-wrap">

            <ColorSchemeDialog
              designScheme={props.designScheme}
              setDesignScheme={props.setDesignScheme}
            />

            <McpTools />

            <IconButton onClick={props.handleFileUpload}>
              📎
            </IconButton>

            <WebSearch
              onSearchResult={(result) => props.onWebSearchResult?.(result)}
              disabled={props.isStreaming}
            />

            <IconButton
              disabled={props.input.length === 0}
              onClick={() => {
                props.enhancePrompt?.();
                toast.success('Prompt enhanced!');
              }}
            >
              ✨
            </IconButton>

            <SpeechRecognitionButton
              isListening={props.isListening}
              onStart={props.startListening}
              onStop={props.stopListening}
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">

            {/* CHAT MODE */}
            {props.chatStarted && (
              <button
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-sm"
                onClick={() =>
                  props.setChatMode?.(
                    props.chatMode === 'discuss' ? 'build' : 'discuss'
                  )
                }
              >
                {props.chatMode === 'discuss' ? 'Discuss' : 'Build'}
              </button>
            )}

            {/* MODEL SETTINGS */}
            <button
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              onClick={() =>
                props.setIsModelSettingsCollapsed(!props.isModelSettingsCollapsed)
              }
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* FOOTER */}
        {props.input.length > 3 && (
          <div className="text-xs text-gray-500 mt-2 text-center">
            Press <b>Enter</b> to send • <b>Shift + Enter</b> for new line
          </div>
        )}

        <SupabaseConnection />
        <ExpoQrModal open={props.qrModalOpen} onClose={() => props.setQrModalOpen(false)} />
      </div>
    </div>
  );
};
