// app.js
document.addEventListener('DOMContentLoaded', () => {
        const counter = document.getElementById('counter');
        const increaseBtn = document.getElementById('increase');
        const decreaseBtn = document.getElementById('decrease');
        
        let count = localStorage.getItem('count') || 0;
        counter.textContent = count;
        
        increaseBtn.addEventListener('click', () => {
            count++;
            counter.textContent = count;
            localStorage.setItem('count', count);
        });
        
        decreaseBtn.addEventListener('click', () => {
            count--;
            counter.textContent = count;
            localStorage.setItem('count', count);
        });
    });