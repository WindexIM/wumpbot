require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('registering commands..');
    console.log('Using TOKEN:', process.env.TOKEN ? 'Loaded' : 'Not loaded');
    console.log('Using CLIENT_ID:', process.env.CLIENT_ID);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('commands registered');
  } catch (error) {
    console.error('commands not registered:', error);
  }
})();
