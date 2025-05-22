// DOM елементи
const tabs = {
  home: document.getElementById('tabHome'),
  upgrade: document.getElementById('tabUpgrade'),
  referrals: document.getElementById('tabReferrals'),
  chests: document.getElementById('tabChests'),
  nft: document.getElementById('tabNFT'),
};

const buttons = {
  home: document.getElementById('btnHomeTab'),
  upgrade: document.getElementById('btnUpgradeTab'),
  referrals: document.getElementById('btnReferralsTab'),
  chests: document.getElementById('btnChestsTab'),
  nft: document.getElementById('btnNFTTab'),
};

const coinsSpan = document.getElementById('coins');
const powerSpan = document.getElementById('power');
const puzzlePiecesSpan = document.getElementById('puzzlePieces');
const nftCollectionDiv = document.getElementById('nftCollection');

const btnTap = document.getElementById('btnTap');
const btnUpgradePower = document.getElementById('btnUpgradePower');
const btnOpenChest = document.getElementById('btnOpenChest');

let coins = 0;
let power = 1;
let puzzlePieces = 0;
let nfts = [];

// Функція для переключення вкладок
function setActiveTab(tabName) {
  for (const key in tabs) {
    tabs[key].classList.toggle('active', key === tabName);
    buttons[key].classList.toggle('active', key === tabName);
  }
}
buttons.home.onclick = () => setActiveTab('home');
buttons.upgrade.onclick = () => setActiveTab('upgrade');
buttons.referrals.onclick = () => setActiveTab('referrals');
buttons.chests.onclick = () => setActiveTab('chests');
buttons.nft.onclick = () => setActiveTab('nft');

// Функція оновлення інтерфейсу
function updateUI() {
  coinsSpan.textContent = coins;
  powerSpan.textContent = power;
  puzzlePiecesSpan.textContent = puzzlePieces;
  renderNFTs();
}

// Тап на Пепе
btnTap.onclick = () => {
  coins += power;
  updateUI();
};

// Покращення сили тапу
btnUpgradePower.onclick = () => {
  if (coins >= 10) {
    coins -= 10;
    power += 1;
    updateUI();
  } else {
    alert('Not enough coins!');
  }
};

// Відкриття сундука
btnOpenChest.onclick = () => {
  if (coins >= 20) {
    coins -= 20;
    puzzlePieces++;
    // Шанс випадання NFT 20%
    if (Math.random() < 0.2) {
      const newNFT = `NFT #${nfts.length + 1}`;
      nfts.push(newNFT);
      alert(`You got a new NFT: ${newNFT}!`);
    }
    updateUI();
  } else {
    alert('Not enough coins to open chest!');
  }
};

// Відображення NFT
function renderNFTs() {
  if (nfts.length === 0) {
    nftCollectionDiv.innerHTML = '<p>No NFTs yet.</p>';
  } else {
    nftCollectionDiv.innerHTML = '<ul>' + nfts.map(nft => `<li>${nft}</li>`).join('') + '</ul>';
  }
}

// Початкове оновлення UI
updateUI();
