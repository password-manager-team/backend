# Password Manager Backend

## Getting started

### Prerequisites

#### Ensure you have Node.js installed on your machine.
Install it with your package manager

```bash
pacman -Sy nodejs
```

Or manually from https://nodejs.org/en

<br>

#### Also make sure to install Docker and docker-compose

```bash
pacman -Sy docker docker-compose
```

Or install [Docker Desktop (GUI + CLI)](https://www.docker.com/products/docker-desktop/)

<br>

### Installation

#### 1. Clone the repository:

```bash
git clone git@github.com:password-manager-team/backend.git
```

#### 2. Navigate to the project directory

```bash
cd backend
```

#### 3. Setup docker (only once)

```bash
# enable the docker service to start on boot (needed only once)
sudo systemctl enable docker

# add your user to the docker group to run docker without sudo
sudo usermod -aG docker $USER

# now log out and log in back or restart your system
```

#### 4. Run docker-compose

```bash
docker-compose up
```

#### 5. Install npm packages

```bash
npm install
```

#### 6. Create a .env file

```bash
cp .env.example .env
```

#### 7. Run the application

```bash
npm run dev
```
