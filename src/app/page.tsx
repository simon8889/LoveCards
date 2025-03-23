"use client"
import { useState, useEffect } from "react"
import "./styles.css"
import content from "./content.json";

interface Card {
  id: string;
  tag: string[];
  image?: string;
  link?: string;
  linkPlaceholder?: string;
  date?: string;
  text?: string;
  author?: string;
}

export default function Home() {

  const [selectedFilter, setSelectedFilter] = useState({ label: "Toda tu colección", value: "all" });

  const selectRandomCard = () => {
    const filteredCards = content.filter(card => card.tag.includes(selectedFilter.value))
    if (filteredCards.length === 0) {
      return null
    }
    const randomIndex = Math.floor(Math.random() * filteredCards.length)
    return filteredCards[randomIndex]
  }

  const [currentCard, setCurrentCard] = useState<Card | null>(null)

  useEffect(() => {
    setCurrentCard(selectRandomCard())
  }, [selectedFilter])

  const handleNewCard = () => {
    const newCard = selectRandomCard()
    setCurrentCard(newCard)
  }

  return (
    <div id="webcrumbs" className="flex justify-center">
      <div className="w-[800px] bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-xl p-8 font-sans">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-800 mb-2">Love Cards</h1>
          <h2 className="text-lg text-primary-600">Descubre frases, canciones o recuerdos con solo un click</h2>
        </header>

        <div className="flex justify-between items-start mb-6">

          <details className="relative group">
            <summary className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-primary-50 transition-all duration-300 outline-none">
              <span className="material-symbols-outlined text-primary-600">filter_alt</span>
              <span className="font-medium">Explora por</span>
              <span className="material-symbols-outlined text-primary-600 group-open:rotate-180 transition-transform duration-300">
                expand_more
              </span>
            </summary>
            <div className="absolute mt-2 bg-white rounded-lg shadow-lg p-2 w-48 z-10 transform origin-top scale-95 group-open:scale-100 transition-all duration-300">
              {[
                { label: "Toda tu colección", value: "all" },
                { label: "Para sonreir", value: "smile" },
                { label: "Poemas", value: "poems" },
                { label: "Te sientes mal?", value: "wellness" },
                { label: "Canciones", value: "songs" },
                { label: "Momentos", value: "moments" },
              ].map(({ label, value }) => (
                <div key={value} className="py-2 px-4 hover:bg-primary-50 rounded-md cursor-pointer transition-colors duration-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      className="accent-primary-600"
                      value={value}
                      checked={selectedFilter.value === value}
                      onChange={(e) => setSelectedFilter({ label, value })}
                    />
                    <span>{label}</span>
                  </label>
                </div>
              ))}
            </div>
          </details>

          <div className="flex items-center gap-2">
            <div className="text-primary-600 flex items-center gap-1">
              <span className="material-symbols-outlined">info</span>

              <span className="text-sm">Tu carta actual: {selectedFilter.label}</span>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] flex justify-center items-center perspective-1000">
          <div className="card w-full h-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-700 hover:rotate-y-5 hover:shadow-2xl">
            <div className="h-full flex flex-col justify-between">
              <div className="text-center mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-semibold">
                  {currentCard?.date}
                </span>
              </div>

              {currentCard?.link &&

                <a href={currentCard?.link} className="flex-grow flex items-center justify-center">
                  <blockquote className="italic text-2xl text-center text-primary-800 leading-relaxed">
                    {currentCard?.linkPlaceholder}
                  </blockquote>
                </a>
              }

              {currentCard?.image && (
                <div className="flex-grow flex items-center justify-center">
                  <img
                    src={currentCard.image}
                    alt="Imagen de la carta"
                    className="max-w-full h-auto"
                  />
                </div>
              )}

              <div className="flex-grow flex items-center justify-center">
                <blockquote className="italic text-2xl text-center text-primary-800 leading-relaxed">
                  {currentCard?.text}
                  <footer className="text-lg font-semibold mt-4 text-primary-600">
                    {currentCard?.author}
                  </footer>
                </blockquote>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-primary-500">Card #{currentCard?.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={handleNewCard} className="group relative inline-flex items-center justify-center p-2 transform transition-all duration-300 active:scale-90 hover:rotate-6">
            <svg
              className="w-16 h-16 fill-primary-500 group-hover:fill-primary-600 transition-all duration-300"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            <span className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary-700 font-medium">
              Descubre otra carta
            </span>

            <div className="absolute inset-0 rounded-full bg-primary-100 scale-0 group-hover:scale-100 -z-10 transition-transform duration-300"></div>
          </button>
          {/* Next: "Add/Change [add a counter showing how many cards have been revealed in the current session]" */}
        </div>

        <footer className="mt-8 text-center text-sm text-primary-500">
          <p>Cuando estés lista, toca el corazón para encontrar una nueva cartita</p>
        </footer>
      </div>
    </div>
  )
}
