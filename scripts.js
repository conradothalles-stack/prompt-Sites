async function gerarCodigo() {
    console.log("Gerando código...");
    let prompt = `Você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

                    Regras de resposta:
                    - Responda SOMENTE com HTML e CSS puros
                    - Não use crases, markdown ou explicações
                    - Não use tags <img>

                    Identidade visual (capriche e surpreenda):
                    - Invente uma paleta de cores única que combine com a essência do negócio
                    - Escolha uma Google Font marcante via @import
                    - Use emojis grandes no lugar de imagens
                    - Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

                    Estrutura da página:
                    - Header com nome do negócio e menu
                    - Hero impactante com título, subtítulo e botão CTA
                    - Seção de diferenciais com emojis
                    - Depoimento de cliente
                    - Footer com contato

Todo o conteúdo em português, criativo e específico para o negócio.`
    let texto = document.querySelector(".caixa-texto").value
    let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer REDACTED"
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "user",
                    "content": texto
                },
                {
                    "role": "system",
                    "content": prompt
                }
            ],
        })
    });
    let dados = await resposta.json();
    let resultado = dados.choices[0].message.content;
    document.querySelector(".bloco-codigo").textContent = resultado;
    console.log(dados);
    let resultadoSite = document.querySelector(".bloco-site");
    resultadoSite.srcdoc = resultado;
}
// Simulação de resposta da IA  

