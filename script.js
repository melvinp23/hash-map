export { HashMap };

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.size = 0;
		this.buckets = new Array(this.capacity);
	}

	// Generates a hash code and modulates by capacity on each iteration to prevent integer overflow and fit within current bucket bounds
	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	// Inserts a key-value pair or updates if the key already exists
	set(key, value) {
		const index = this.hash(key);

		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}

		if (!this.buckets[index]) {
			this.buckets[index] = [];
		}

		const bucket = this.buckets[index];
		let found = false;

		for (let i = 0; i < bucket.length; i++) {
			if (bucket[i][0] === key) {
				bucket[i][1] = value; // Overwrite existing value
				found = true;
				break;
			}
		}

		if (!found) {
			bucket.push([key, value]);
			this.size++;
		}

		// Check if capacity needs to expand based on load factor
		if (this.size / this.capacity > this.loadFactor) {
			this.resize();
		}
	}

	// Doubles the capacity of the hash map and re-hashes all existing entries
	resize() {
		const oldBuckets = this.buckets;
		this.capacity *= 2;
		this.buckets = new Array(this.capacity);
		this.size = 0; // Will be re-incremented during set()

		oldBuckets.forEach(bucket => {
			if (bucket) {
				bucket.forEach(([key, value]) => {
					this.set(key, value);
				});
			}
		});
	}

	// Returns the value associated with the key, or undefined if not found
	get(key) {
		const index = this.hash(key);
		const bucket = this.buckets[index];

		if (!bucket) return undefined;

		for (let i = 0; i < bucket.length; i++) {
			if (bucket[i][0] === key) {
				return bucket[i][1];
			}
		}

		return undefined;
	}

	// Returns true if the key is in the hash map, returns false otherwise
	has(key) {
		return this.get(key) !== undefined;
	}

	// Remove entry with the given key, returns true if found/removed, returns false otherwise
	remove(key) {
		const index = this.hash(key);
		const bucket = this.buckets[index];

		if (!bucket) return false;

		for (let i = 0; i < bucket.length; i++) {
			if (bucket[i][0] === key) {
				bucket.splice(i, 1);
				this.size--;
				return true;
			}
		}

		return false;
	}

	// Returns the number of stored keys in the hash map
	length() {
		return this.size;
	}

	// CLear all entries and resets to initial capacity
	clear() {
		this.capacity = 16;
		this.buckets = new Array(this.capacity);
		this.size = 0;
	}

	// Returns an array containing all keys
	keys() {
		const allKeys = [];

		this.buckets.forEach(bucket => {
			if (bucket) {
				bucket.forEach(([key]) => {
					allKeys.push(key);
				});
			}
		});

		return allKeys;
	}

	// Returns an array containing all values
	values() {
		const allValues = [];

		this.buckets.forEach(bucket => {
			if (bucket) {
				bucket.forEach(([_, value]) => {
					allValues.push(value);
				});
			}
		});

		return allValues;
	}

	// Returns an array containing each key-value pair [key, value]
	entries() {
		const allEntries = [];
		this.buckets.forEach(bucket => {
			if (bucket) {
				bucket.forEach(pair => {
					allEntries.push(pair);
				});
			}
		});

		return allEntries;
	}
}

class HashSet {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.size = 0;
		this.buckets = new Array(this.capacity);
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) & this.capacity;
		}
		return hashCode;
	}

	add(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to acces index out of bound');
		}

		if (!this.buckets[index]) {
			this.buckets[index] = [];
		}

		const bucket = this.buckets[index];

		for (let i = 0; i < bucket.length; i++) {
			if (bucket[i] === key) {
				return;
			}
		}

		bucket.push(key);
		this.size++;

		if (this.size / this.capacity > this.loadFactor) {
			this.resize();
		}
	}

	set(key) {}

	resize() {}

	has(key) {}

	remove(key) {}

	length() {}

	clear() {}

	keys() {}

	values() {}

	entries() {}
}
