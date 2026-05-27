// Russian language learning content for English-speaking children
// Curated to be safe, simple, age-appropriate (ages 5-8).
// Emojis carry visual meaning so kids can identify items without depending on reading.

export type LetterCard = {
  upper: string;   // Cyrillic uppercase
  lower: string;   // Cyrillic lowercase
  sound: string;   // English approximation
  example: string; // Russian example word
  exampleEn: string; // English translation
  exampleEmoji: string;
  // Looks-like English letter? (helps younger learners)
  lookalike?: string;
  funFact?: string;
};

// Subset of the Cyrillic alphabet — child-safe and starts with common letters.
// Ordered pedagogically: "lookalikes" first, then new sounds.
export const LETTERS: LetterCard[] = [
  { upper: "А", lower: "а", sound: "ah",  example: "Арбуз",   exampleEn: "watermelon", exampleEmoji: "🍉", lookalike: "A", funFact: "Sounds like 'a' in 'father'." },
  { upper: "К", lower: "к", sound: "k",   example: "Кот",     exampleEn: "cat",        exampleEmoji: "🐱", lookalike: "K" },
  { upper: "М", lower: "м", sound: "m",   example: "Мама",    exampleEn: "mom",        exampleEmoji: "👩", lookalike: "M" },
  { upper: "Т", lower: "т", sound: "t",   example: "Торт",    exampleEn: "cake",       exampleEmoji: "🎂", lookalike: "T" },
  { upper: "О", lower: "о", sound: "oh",  example: "Облако",  exampleEn: "cloud",      exampleEmoji: "☁️", lookalike: "O" },
  { upper: "С", lower: "с", sound: "s",   example: "Солнце",  exampleEn: "sun",        exampleEmoji: "☀️", lookalike: "C" },
  { upper: "Б", lower: "б", sound: "b",   example: "Банан",   exampleEn: "banana",     exampleEmoji: "🍌", funFact: "Looks like a flag on a pole!" },
  { upper: "Д", lower: "д", sound: "d",   example: "Дом",     exampleEn: "house",      exampleEmoji: "🏠" },
  { upper: "Е", lower: "е", sound: "yeh", example: "Ёж",      exampleEn: "hedgehog",   exampleEmoji: "🦔", lookalike: "E", funFact: "Sounds like 'ye' in 'yes'." },
  { upper: "Ж", lower: "ж", sound: "zh",  example: "Жираф",   exampleEn: "giraffe",    exampleEmoji: "🦒", funFact: "Sounds like the 's' in 'measure'." },
  { upper: "И", lower: "и", sound: "ee",  example: "Игрушка", exampleEn: "toy",        exampleEmoji: "🧸", funFact: "Like 'ee' in 'see'." },
  { upper: "Л", lower: "л", sound: "l",   example: "Лиса",    exampleEn: "fox",        exampleEmoji: "🦊" },
  { upper: "Н", lower: "н", sound: "n",   example: "Нос",     exampleEn: "nose",       exampleEmoji: "👃", lookalike: "H", funFact: "Looks like H but says 'n'!" },
  { upper: "П", lower: "п", sound: "p",   example: "Пицца",   exampleEn: "pizza",      exampleEmoji: "🍕" },
  { upper: "Р", lower: "р", sound: "r",   example: "Радуга",  exampleEn: "rainbow",    exampleEmoji: "🌈", lookalike: "P", funFact: "Looks like P but says a rolled 'r'!" },
  { upper: "У", lower: "у", sound: "oo",  example: "Утка",    exampleEn: "duck",       exampleEmoji: "🦆", lookalike: "Y", funFact: "Sounds like 'oo' in 'food'." },
  { upper: "Ф", lower: "ф", sound: "f",   example: "Флаг",    exampleEn: "flag",       exampleEmoji: "🚩" },
  { upper: "Х", lower: "х", sound: "kh",  example: "Хлеб",    exampleEn: "bread",      exampleEmoji: "🍞", lookalike: "X", funFact: "Soft 'h' sound, like in 'aha!'" },
  { upper: "Ц", lower: "ц", sound: "ts",  example: "Цветок",  exampleEn: "flower",     exampleEmoji: "🌸" },
  { upper: "Ч", lower: "ч", sound: "ch",  example: "Часы",    exampleEn: "clock",      exampleEmoji: "🕒" },
  { upper: "Ш", lower: "ш", sound: "sh",  example: "Шар",     exampleEn: "balloon",    exampleEmoji: "🎈" },
  { upper: "Я", lower: "я", sound: "ya",  example: "Яблоко",  exampleEn: "apple",      exampleEmoji: "🍎", funFact: "Means 'I' in Russian! And it's a letter!" },
  { upper: "Ю", lower: "ю", sound: "yoo", example: "Юла",     exampleEn: "spinning top", exampleEmoji: "🎡" },
  { upper: "З", lower: "з", sound: "z",   example: "Зебра",   exampleEn: "zebra",      exampleEmoji: "🦓" },
];

export type VocabWord = {
  ru: string;       // Russian word
  en: string;       // English translation
  emoji: string;    // Visual cue
  category: VocabCategory;
};

export type VocabCategory =
  | "animals"
  | "food"
  | "family"
  | "colors"
  | "numbers"
  | "greetings";

export const CATEGORIES: { id: VocabCategory; title: string; emoji: string; color: string }[] = [
  { id: "animals",   title: "Animals",   emoji: "🐶", color: "coral" },
  { id: "food",      title: "Food",      emoji: "🍎", color: "sun" },
  { id: "family",    title: "Family",    emoji: "👨‍👩‍👧", color: "grape" },
  { id: "colors",    title: "Colors",    emoji: "🎨", color: "sky" },
  { id: "numbers",   title: "Numbers",   emoji: "🔢", color: "mint" },
  { id: "greetings", title: "Hello!",    emoji: "👋", color: "coral" },
];

export const VOCAB: VocabWord[] = [
  // Animals
  { ru: "Кот",    en: "cat",    emoji: "🐱", category: "animals" },
  { ru: "Собака", en: "dog",    emoji: "🐶", category: "animals" },
  { ru: "Птица",  en: "bird",   emoji: "🐦", category: "animals" },
  { ru: "Рыба",   en: "fish",   emoji: "🐟", category: "animals" },
  { ru: "Лиса",   en: "fox",    emoji: "🦊", category: "animals" },
  { ru: "Медведь",en: "bear",   emoji: "🐻", category: "animals" },
  { ru: "Корова", en: "cow",    emoji: "🐮", category: "animals" },
  { ru: "Лошадь", en: "horse",  emoji: "🐴", category: "animals" },

  // Food
  { ru: "Яблоко",  en: "apple",     emoji: "🍎", category: "food" },
  { ru: "Хлеб",    en: "bread",     emoji: "🍞", category: "food" },
  { ru: "Молоко",  en: "milk",      emoji: "🥛", category: "food" },
  { ru: "Сыр",     en: "cheese",    emoji: "🧀", category: "food" },
  { ru: "Банан",   en: "banana",    emoji: "🍌", category: "food" },
  { ru: "Пицца",   en: "pizza",     emoji: "🍕", category: "food" },
  { ru: "Торт",    en: "cake",      emoji: "🎂", category: "food" },
  { ru: "Вода",    en: "water",     emoji: "💧", category: "food" },

  // Family
  { ru: "Мама",   en: "mom",       emoji: "👩", category: "family" },
  { ru: "Папа",   en: "dad",       emoji: "👨", category: "family" },
  { ru: "Брат",   en: "brother",   emoji: "👦", category: "family" },
  { ru: "Сестра", en: "sister",    emoji: "👧", category: "family" },
  { ru: "Бабушка",en: "grandma",   emoji: "👵", category: "family" },
  { ru: "Дедушка",en: "grandpa",   emoji: "👴", category: "family" },
  { ru: "Друг",   en: "friend",    emoji: "🧑‍🤝‍🧑", category: "family" },

  // Colors
  { ru: "Красный",en: "red",       emoji: "🟥", category: "colors" },
  { ru: "Синий",  en: "blue",      emoji: "🟦", category: "colors" },
  { ru: "Жёлтый", en: "yellow",    emoji: "🟨", category: "colors" },
  { ru: "Зелёный",en: "green",     emoji: "🟩", category: "colors" },
  { ru: "Чёрный", en: "black",     emoji: "⬛", category: "colors" },
  { ru: "Белый",  en: "white",     emoji: "⬜", category: "colors" },
  { ru: "Розовый",en: "pink",      emoji: "🌸", category: "colors" },

  // Numbers
  { ru: "Один",   en: "one",       emoji: "1️⃣", category: "numbers" },
  { ru: "Два",    en: "two",       emoji: "2️⃣", category: "numbers" },
  { ru: "Три",    en: "three",     emoji: "3️⃣", category: "numbers" },
  { ru: "Четыре", en: "four",      emoji: "4️⃣", category: "numbers" },
  { ru: "Пять",   en: "five",      emoji: "5️⃣", category: "numbers" },
  { ru: "Шесть",  en: "six",       emoji: "6️⃣", category: "numbers" },
  { ru: "Семь",   en: "seven",     emoji: "7️⃣", category: "numbers" },
  { ru: "Восемь", en: "eight",     emoji: "8️⃣", category: "numbers" },
  { ru: "Девять", en: "nine",      emoji: "9️⃣", category: "numbers" },
  { ru: "Десять", en: "ten",       emoji: "🔟", category: "numbers" },

  // Greetings & simple phrases
  { ru: "Привет", en: "hi",        emoji: "👋", category: "greetings" },
  { ru: "Пока",   en: "bye",       emoji: "🖐️", category: "greetings" },
  { ru: "Спасибо",en: "thank you", emoji: "🙏", category: "greetings" },
  { ru: "Пожалуйста", en: "please", emoji: "🤲", category: "greetings" },
  { ru: "Да",     en: "yes",       emoji: "✅", category: "greetings" },
  { ru: "Нет",    en: "no",        emoji: "❌", category: "greetings" },
];

export function getVocabByCategory(cat: VocabCategory): VocabWord[] {
  return VOCAB.filter(v => v.category === cat);
}

// Friendly success/fail prompts (English only, kid-safe).
export const PRAISE = [
  "Yay! Great job!",
  "Awesome!",
  "You did it!",
  "Wonderful!",
  "High five!",
  "Super star!",
];

export const TRY_AGAIN = [
  "Almost! Try again.",
  "Oops, give it another go.",
  "You can do it — try once more.",
];

// Modules listed on home screen
export type ModuleId =
  | "letters"
  | "words"
  | "listen"
  | "match"
  | "repeat"
  | "review";

export const MODULES: { id: ModuleId; title: string; subtitle: string; emoji: string; color: string; description: string; }[] = [
  { id: "letters", title: "Letter Sounds",  subtitle: "Cyrillic ABCs",    emoji: "🔤", color: "coral", description: "Tap each letter and hear it!" },
  { id: "words",   title: "First Words",    subtitle: "Words by topic",   emoji: "📚", color: "sun",   description: "Animals, food, family — and more." },
  { id: "listen",  title: "Listen & Pick",  subtitle: "Hear, then choose", emoji: "👂", color: "sky",   description: "Listen, then tap the right picture." },
  { id: "match",   title: "Match It!",      subtitle: "Picture + word",   emoji: "🧩", color: "mint",  description: "Match the Russian word to the picture." },
  { id: "repeat",  title: "Say It!",        subtitle: "Repeat after me",  emoji: "🎤", color: "grape", description: "Listen, then say it out loud." },
  { id: "review",  title: "Star Round",     subtitle: "Mini review",      emoji: "⭐", color: "coral", description: "Mix it up and earn stars." },
];
