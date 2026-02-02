import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import data from '../data/steps.json'

const steps = data.map(d => ({
    date: new Date(d.Date),
    steps: d.Steps
}))

const root = createRoot(document.getElementById('app'))
root.render(<App steps={steps}/>)

console.log(steps[0])