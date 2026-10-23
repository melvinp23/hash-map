import { HashMap } from './script.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('--- Initial Population ---');
console.log('Length (should be 12):', test.length());
console.log('Capacity (should be 16):', test.capacity);

test.set('apple', 'bright red');
test.set('banana', 'bright yellow');
console.log('--- After Overwriting ---');
console.log('Apple value:', test.get('apple')); // 'bright red'
console.log('Length (still 12):', test.length());
console.log('Capacity (still 16):', test.capacity);

test.set('moon', 'silver');
console.log('--- After Exceeding Load Factor ---');
console.log('Length (should be 13):', test.length());
console.log('New Capacity (should double to 32):', test.capacity);

// 5. Test other methods on the expanded hash map
console.log('--- Testing Methods ---');
console.log("Has 'dog':", test.has('dog')); // true
console.log("Get 'dog':", test.get('dog')); // 'brown'
console.log("Remove 'jacket':", test.remove('jacket')); // true
console.log("Has 'jacket' after removal:", test.has('jacket')); // false
console.log('New Length after removal:', test.length()); // 12

console.log('All Keys:', test.keys());
console.log('All Values:', test.values());
console.log('All Entries:', test.entries());

// 6. Test clear()
test.clear();
console.log('--- After Clear ---');
console.log('Length (should be 0):', test.length());
console.log('Capacity (should reset to 16):', test.capacity);
console.log('Entries:', test.entries());
