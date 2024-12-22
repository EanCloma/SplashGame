export class InputHandler {
    constructor() {
        this.keys = [];
        
        // Listen for keydown events
        window.addEventListener('keydown', e => {
            console.log(e.key, this.keys);
            // Check if the key is one of the specified keys and not already in the keys array
            if ((e.key === 'ArrowDown' ||
                 e.key === 'ArrowUp' ||
                 e.key === 'ArrowLeft' ||
                 e.key === 'ArrowRight' ||
                 e.key === 'Enter') && 
                this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);
        });

        // Listen for keyup events
        window.addEventListener('keyup', e => {
            // Check if the key is one of the specified keys
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter') {
                // Remove the key from the keys array
                const index = this.keys.indexOf(e.key);
                if (index > -1) {
                    this.keys.splice(index, 1);
                }
            }
            console.log(e.key, this.keys);
        });
    }
}