import React, { useState, useEffect } from "react";

import ThoughtForm from "components/ThoughtForm";
import ThoughtList from "components/ThoughtList";
import Footer from "components/Footer";

export const App = () => {
  const [thoughtList, setThoughtList] = useState([])
  const [newThought, setNewThought] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getThought()
  }, [])

  const getThought = () => {
    setLoading(true);
    fetch('https://project-happy-thoughts-by-lala.herokuapp.com/thoughts')
      .then(res => res.json())
      .then(data => setThoughtList(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newThought }),
    }

    fetch('https://project-happy-thoughts-by-lala.herokuapp.com/thoughts', options)
      .then(res => res.json())
      .then(() => {
        getThought(setNewThought(""))
      })
  }

  const handleIncreaseLikes = (thoughtId) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch(`https://project-happy-thoughts-by-lala.herokuapp.com/thoughts/${thoughtId}/like`, options)
      .then(res => res.json())
      .then(() => getThought())
      getThought()
  }

  

return (
  <>
  <ThoughtForm 
    newThought={newThought}
    setNewThought={setNewThought}
    onFormSubmit={onFormSubmit}
  />
  <ThoughtList 
    thoughtList={thoughtList} 
    loading={loading}
    onIncreaseLikes={handleIncreaseLikes}
  />
  <Footer />
  </>
)
}