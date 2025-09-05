import ChatPage from './pages/chat/page'
import { ChatProvider } from './modules/chat/context/ChatContext'

function App() {

  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  )
}

export default App
