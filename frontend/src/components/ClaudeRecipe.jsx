import ReactMarkdown from "react-markdown"

function ClaudeRecipe(props) {
    return (
            <section ref={props.ref}>
              <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </section>
    )
}

export default ClaudeRecipe
