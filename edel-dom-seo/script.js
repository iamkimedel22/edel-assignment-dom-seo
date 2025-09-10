// DOM Manipulation Functions

// Array of different texts to cycle through
const textOptions = [
    "Basketball has been my passion since I was a kid. The sound of the ball bouncing, the swish of a perfect shot, and the teamwork required make it the most exciting sport in the world!",
    "Every time I step onto the basketball court, I feel alive! The fast-paced action, strategic plays, and the thrill of competition make basketball my ultimate favorite hobby.",
    "From pickup games with friends to watching professional matches, basketball never fails to excite me. The sport teaches discipline, teamwork, and the value of hard work.",
    "Basketball is more than just a game to me - it's a way of life! The skills I learn on the court, like perseverance and quick decision-making, help me in everyday situations.",
    "The basketball court is my sanctuary. Whether I'm practicing free throws or working on my defense, every moment spent playing makes me a better person and athlete."
];

let currentTextIndex = 0;

// Array of basketball memories to add dynamically
const memoryOptions = [
    "Making my first slam dunk (well, almost!)",
    "Playing in the rain and loving every minute",
    "Learning the perfect shooting form",
    "Joining my first basketball team",
    "Attending a live professional game",
    "Teaching my younger sibling to play",
    "Winning a local tournament",
    "Meeting other basketball enthusiasts",
    "Discovering my favorite basketball shoes",
    "Learning advanced dribbling techniques",
    "First time playing point guard",
    "Making friends through basketball",
    "Improving my free throw percentage",
    "Learning to read the game better",
    "Developing my signature move"
];

// Function to change paragraph text
function changeText() {
    const paragraph = document.getElementById('dynamicText');
    currentTextIndex = (currentTextIndex + 1) % textOptions.length;
    paragraph.style.opacity = '0';
    
    setTimeout(() => {
        paragraph.textContent = textOptions[currentTextIndex];
        paragraph.style.opacity = '1';
    }, 200);
}

// Function to add new list item
function addListItem() {
    const list = document.getElementById('basketballMemories');
    const randomMemory = memoryOptions[Math.floor(Math.random() * memoryOptions.length)];
    
    const newListItem = document.createElement('li');
    newListItem.textContent = randomMemory;
    newListItem.style.opacity = '0';
    newListItem.style.transform = 'translateX(-20px)';
    
    list.appendChild(newListItem);
    
    // Smooth animation
    setTimeout(() => {
        newListItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        newListItem.style.opacity = '1';
        newListItem.style.transform = 'translateX(0)';
    }, 10);
}

// Function to remove an element
function removeElement() {
    const removableElements = document.querySelectorAll('.removable-element');
    const listItems = document.querySelectorAll('#basketballMemories li');
    
    // First try to remove removable elements
    if (removableElements.length > 0) {
        const elementToRemove = removableElements[0];
        elementToRemove.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        elementToRemove.style.opacity = '0';
        elementToRemove.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            elementToRemove.remove();
        }, 300);
    }
    // If no removable elements, remove last list item
    else if (listItems.length > 1) {
        const lastItem = listItems[listItems.length - 1];
        lastItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        lastItem.style.opacity = '0';
        lastItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            lastItem.remove();
        }, 300);
    }
    // If only one list item remains, show a message
    else {
        alert('No more elements to remove! Add some basketball memories first.');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth transitions to the dynamic text
    const dynamicText = document.getElementById('dynamicText');
    dynamicText.style.transition = 'opacity 0.2s ease';
    
    // Attach event listeners to buttons
    document.getElementById('changeTextBtn').addEventListener('click', changeText);
    document.getElementById('addListItemBtn').addEventListener('click', addListItem);
    document.getElementById('removeElementBtn').addEventListener('click', removeElement);
    
    // Add some interactive effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});