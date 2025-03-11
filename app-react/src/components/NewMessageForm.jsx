function NewMessageForm() {
    return (
      <div className="new-message">
        <form>
          <input type="text" placeholder="Écrivez votre message..." name="new-message" />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    );
  }
  
  export default NewMessageForm;