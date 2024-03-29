## \* CodeSandBox에서 env 설정을 할 수 없어 아래 배포 페이지를 참고해주세요.

## [Vercel 배포](https://ruehan-nomad-movie.vercel.app/)

# Nomad-React4-Movie App

- [x] Using React Router, React Query, Styled Components and Motion build a movie app

## Requirements

- [x] Home Page

- [x] Coming Soon Page

- [x] Now Playing Page

- [x] When a movie is clicked, create a modal that displays the movie's detail.

- [x] Use React Query to fetch the data.

- [x] Use Framer Motion to recreate the animations seen in the video (navigation, movies list, modal)

## Implementation List

### Common (Popular / Coming Soon / Now Playing)

- [x] Vote Average & Vote Count

- [x] Release Date

- [x] Poster

- [x] DarkMode

- [x] Translate

### Detail Page

- [x] Collection

- [x] Genres

- [x] Runtime

- [x] Overview

- [x] Title

- [x] Vote Average & Vote Count

- [x] Overview Translate

- [x] Movie Preview

- [ ] Collections Detail

### Error Page

- [ ] 404 Not Found

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
