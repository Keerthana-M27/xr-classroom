import { useLocation } from 'react-router-dom'
import AdditionLesson from '../lessons/AdditionLesson'
import SubtractionLesson from '../lessons/SubtractionLesson'
import MultiplicationLesson from '../lessons/MultiplicationLesson'
import DivisionLesson from '../lessons/DivisionLesson'
import SolarSystemLesson from '../lessons/SolarSystemLesson'
import AnimalsLesson from '../lessons/AnimalsLesson'
import PlantsLesson from '../lessons/PlantsLesson'
import HumanBodyLesson from '../lessons/HumanBodyLesson'
import AlphabetsLesson from '../lessons/AlphabetsLesson'
import SpellingsLesson from '../lessons/SpellingsLesson'
import GrammarLesson from '../lessons/GrammarLesson'
import StoriesLesson from '../lessons/StoriesLesson'
import ComputerLesson from '../lessons/ComputerLesson'
import KeyboardMouseLesson from '../lessons/KeyboardMouseLesson'
import FunGamesLesson from '../lessons/FunGamesLesson'
import ContinentsLesson from '../lessons/ContinentsLesson'
import OceansLesson from '../lessons/OceansLesson'
import MountainsLesson from '../lessons/MountainsLesson'
import CountriesLesson from '../lessons/CountriesLesson'
import DrawingLesson from '../lessons/DrawingLesson'
import ColoursLesson from '../lessons/ColoursLesson'
import CraftLesson from '../lessons/CraftLesson'
import SculptureLesson from '../lessons/SculptureLesson'
import HealthyFoodLesson from '../lessons/HealthyFoodLesson'
import ExerciseLesson from '../lessons/ExerciseLesson'
import HygieneLesson from '../lessons/HygieneLesson'
import BodyPartsLesson from '../lessons/BodyPartsLesson'

function LessonView() {
  const location = useLocation()
  const lesson = location.state?.lesson || ''
  const name = location.state?.name || 'Student'

  if (lesson === 'Addition') return <AdditionLesson name={name} />
  if (lesson === 'Subtraction') return <SubtractionLesson name={name} />
  if (lesson === 'Multiplication') return <MultiplicationLesson name={name} />
  if (lesson === 'Division') return <DivisionLesson name={name} />
  if (lesson === 'Solar System') return <SolarSystemLesson name={name} />
  if (lesson === 'Animals') return <AnimalsLesson name={name} />
  if (lesson === 'Plants') return <PlantsLesson name={name} />
  if (lesson === 'Human Body') return <HumanBodyLesson name={name} />
  if (lesson === 'Alphabets') return <AlphabetsLesson name={name} />
  if (lesson === 'Spellings') return <SpellingsLesson name={name} />
  if (lesson === 'Grammar') return <GrammarLesson name={name} />
  if (lesson === 'Stories') return <StoriesLesson name={name} />
  if (lesson === 'What is Computer') return <ComputerLesson name={name} />
  if (lesson === 'Keyboard & Mouse') return <KeyboardMouseLesson name={name} />
  if (lesson === 'Fun Games') return <FunGamesLesson name={name} />
  if (lesson === 'Continents') return <ContinentsLesson name={name} />
  if (lesson === 'Oceans') return <OceansLesson name={name} />
  if (lesson === 'Mountains') return <MountainsLesson name={name} />
if (lesson === 'Countries') return <CountriesLesson name={name} />
if (lesson === 'Drawing') return <DrawingLesson name={name} />
if (lesson === 'Colours') return <ColoursLesson name={name} />
if (lesson === 'Craft') return <CraftLesson name={name} />
if (lesson === 'Sculpture') return <SculptureLesson name={name} />
if (lesson === 'Healthy Food') return <HealthyFoodLesson name={name} />
if (lesson === 'Exercise') return <ExerciseLesson name={name} />
if (lesson === 'Hygiene') return <HygieneLesson name={name} />
if (lesson === 'Body Parts') return <BodyPartsLesson name={name} />
  // Placeholder for lessons not built yet
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚧</div>
      <h1 style={{ color: '#FFD700', fontSize: '35px' }}>{lesson}</h1>
      <p style={{ color: '#d8b4fe', fontSize: '20px', marginTop: '10px' }}>Coming Soon! 🚀</p>
      <button
        onClick={() => window.history.back()}
        style={{ marginTop: '30px', backgroundColor: 'transparent', color: '#FFD700', fontSize: '18px', border: '2px solid #FFD700', padding: '12px 30px', borderRadius: '50px', cursor: 'pointer' }}
      >
        ⬅️ Go Back
      </button>
    </div>
  )
}

export default LessonView