import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3N2FiZDBmYi04OTI1LTQ2MGEtOGY5Yi0zNWQ0YjZkZWFmYTIiLCJ1c2VybmFtZSI6InRlc3RpbmdzbCIsImlhdCI6MTY4MjI3MzczOCwiZXhwIjoxNjg0ODY1NzM4fQ.RQdvB5JY-nzv3a_mxMyKvUndDx6G_zwYLQRzVG-Ev_E',
    user: 'testingsl'
  }
})

export default api
