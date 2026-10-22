class HashMap {
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
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

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
				bucket[i][1] = value;
				found = true;
				break;
			}
		}

		if (!found) {
			bucket.push([key, value]);
			this.size++;
		}

		if (this.size / this.capacity > this.loadFactor) {
			this.resize();
		}
	}

	resize() {
		const oldBuckets = this.buckets;
		this.capacity *= 2;
		this.buckets = new Array(this.capacity);
		this.size = 0;

		oldBuckets.forEach(bucket => {
			if (bucket) {
				bucket.forEach(([key, value]) => {
					this.set(key, value);
				});
			}
		});
	}

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

	has(key) {
		return this.get(key) !== undefined;
	}

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

	length() {}

	clear() {}

	keys() {}

	values() {}

	entries() {}
}
