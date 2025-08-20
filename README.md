# Psycholog Transportu - Strona Wizytówka

Nowoczesna, responsywna strona internetowa dla psychologa transportu w Przemyślu, zbudowana z użyciem Next.js i TailwindCSS.

## 🚀 Funkcje

- ✅ **Responsywny design** - optimizowany dla wszystkich urządzeń
- ✅ **SEO-friendly** - zoptymalizowany pod kątem "psycholog transportu Przemyśl"
- ✅ **Nowoczesny interfejs** - profesjonalny design budzący zaufanie
- ✅ **Sekcje strony**:
  - Hero z Call-to-Action
  - O mnie - informacje o psychologu
  - Usługi - psychotesty i konsultacje
  - Opinie klientów - slider z recenzjami
  - Kontakt - formularz, dane kontaktowe, mapa Google
  - Polityka prywatności
- ✅ **Konfigurowalność** - łatwa zmiana danych przez config.json
- ✅ **Docker Ready** - gotowe do wdrożenia na serwerze

## 🛠 Technologie

- **Framework**: Next.js 15.5.0
- **Styling**: TailwindCSS 4.0
- **Language**: TypeScript
- **Container**: Docker + Docker Compose

## 🏃‍♂️ Szybki start

### Wymagania
- Node.js 18+ 
- npm lub yarn

### Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Otwórz http://localhost:3000 w przeglądarce
```

### Konfiguracja treści

Wszystkie teksty, dane kontaktowe i inne informacje można łatwo zmienić w pliku:
```
src/config/site.json
```

Przykład konfiguracji:
```json
{
  "psychologist": {
    "name": "Dr Anna Kowalska",
    "phone": "+48 123 456 789",
    "email": "kontakt@example.pl"
  },
  "contact": {
    "address": {
      "street": "ul. Słowackiego 15",
      "city": "Przemyśl",
      "postalCode": "37-700"
    }
  }
}
```

## 🐳 Wdrożenie z Docker

### Budowanie obrazu Docker

```bash
# Zbuduj obraz
docker build -t psycholog-transportu .

# Uruchom kontener
docker run -p 3000:3000 psycholog-transportu
```

### Docker Compose (zalecane)

```bash
# Uruchom całą aplikację
docker-compose up -d

# Sprawdź logi
docker-compose logs -f

# Zatrzymaj aplikację
docker-compose down
```

## 🌐 Wdrożenie na Hetzner

### 1. Przygotowanie serwera

```bash
# Zainstaluj Docker i Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Zainstaluj Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Wdrożenie aplikacji

```bash
# Prześlij pliki na serwer
scp -r . user@your-server:/opt/psycholog-transportu

# Połącz się z serwerem
ssh user@your-server

# Przejdź do katalogu aplikacji
cd /opt/psycholog-transportu

# Uruchom aplikację
docker-compose up -d
```

### 3. Konfiguracja reverse proxy (opcjonalna)

Odkomentuj sekcję Traefik w `docker-compose.yml` dla automatycznego SSL:

```yaml
# Zmień domenę na właściwą
- "traefik.http.routers.psycholog.rule=Host(`twoja-domena.pl`)"
```

## 📱 Responsywność

Strona jest w pełni responsywna i działa poprawnie na:
- 📱 Telefonach (320px+)
- 📟 Tabletach (768px+)
- 💻 Desktopach (1024px+)
- 🖥 Dużych ekranach (1440px+)

## 🎨 Personalizacja

### Kolory
Zmiana kolorystyki w pliku `src/app/globals.css`

### Czcionki
Aktualnie używana czcionka: **Inter**
Zmiana w pliku `src/app/layout.tsx`

### Zdjęcia
Umieść zdjęcia w folderze `public/images/`:
- `psychologist.jpg` - zdjęcie psychologa
- `logo.png` - logo gabinetu (opcjonalne)

## 🔧 SEO i Performance

### Zoptymalizowane elementy:
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags dla social media
- ✅ Structured data dla Local Business
- ✅ Optymalizacja obrazów
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Kompresja zasobów

### Local SEO:
- ✅ Schema.org LocalBusiness
- ✅ NAP (Name, Address, Phone) konsystentne
- ✅ Google Maps integracja
- ✅ Słowa kluczowe: "psycholog transportu Przemyśl"

## 📄 Struktura plików

```
psycholog-transportu/
├── src/
│   ├── app/                 # Pages (App Router)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── polityka-prywatnosci/
│   ├── components/          # React komponenty
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Services/
│   │   ├── Reviews/
│   │   ├── Contact/
│   │   └── Layout/
│   ├── config/              # Konfiguracja treści
│   │   └── site.json
│   └── lib/                 # Utilities
├── public/                  # Statyczne pliki
├── Dockerfile              # Konfiguracja Docker
├── docker-compose.yml      # Docker Compose
└── CLAUDE.md              # Dokumentacja projektu
```

## 🔐 Polityka prywatności

Strona zawiera kompletną politykę prywatności zgodną z RODO, dostępną pod adresem `/polityka-prywatnosci`.

## 📞 Wsparcie

W razie pytań lub problemów:
- Sprawdź dokumentację w pliku `CLAUDE.md`
- Sprawdź konfigurację w `src/config/site.json`
- Zweryfikuj logi: `docker-compose logs -f`

---
**Zbudowane z ❤️ używając Next.js i TailwindCSS**
