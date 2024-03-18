# Nomad-React4-Movie App

- [x] Using React Router, React Query, Styled Components and Motion build a movie app

## Requirements

- [x] Home Page

- [x] Coming Soon Page

- [x] Now Playing Page

- [ ] When a movie is clicked, create a modal that displays the movie's detail.

- [x] Use React Query to fetch the data.

- [ ] Use Framer Motion to recreate the animations seen in the video (navigation, movies list, modal)

## Implementation List

### Common (Popular / Coming Soon / Now Playing)

- [ ] Infinity Scroll

- [ ] Search Bar (Title / Genre)

- [x] Vote Average & Vote Count

- [x] Release Date

- [x] Poster

- [ ] Adult Warning

### Detail Page

- [ ] Collection

- [ ] Genres

- [ ] Runtime

- [ ] Status

- [ ] Overview

- [ ] Title

- [ ] Vote Average & Vote Count

### MY Page

- [ ] User History (Clicked Movies List)

### Search Page

- [ ] Search Results

## API Exemple

### Movie

```
{
  adult: false
  backdrop_path: "/gJL5kp5FMopB2sN4WZYnNT5uO0u.jpg"
  genre_ids: (5) [28, 12, 16, 35, 10751]
  id: 1011985
  original_language: "en"
  original_title: "Kung Fu Panda 4"
  overview: "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past."
  popularity: 3781.812
  poster_path: "/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg"
  release_date: "2024-03-02"
  title: "Kung Fu Panda 4"
  video: false
  vote_average: 6.9
  vote_count: 157
}
```

### Movie Detail
