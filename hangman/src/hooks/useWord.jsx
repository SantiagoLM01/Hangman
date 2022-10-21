import { useContext } from "react"
import { WordContext } from "../context/WordContext"

const useWord = () => {
  return useContext(WordContext)
}

export default useWord