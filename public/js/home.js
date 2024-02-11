// Sidebar
function openNav() {
    $('#sidebar').css('width', '250px')
}

function closeNav() {
    $('#sidebar').css('width', '0px')
}

//stripe
function subscribe() {
    fetch(`${process.env.NODE_ENV === 'production' ? process.env.REMOTE_URL : process.env.LOCAL_URL}subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscription: '1 month'
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        window.location = url
    }).catch(e => {
        console.error(e);
    })
}

$('.subscribe').on('click', () => {
    subscribe()
})
