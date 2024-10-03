# AssinAPIs

Welcome to documentation of AssinAPI in this readme you gonna get a starter guide to use the API to install and usage

1. [Before Install](#before-install)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Documents](#documents)
5. [Envelopes](#envelopes)
6. [Signers](#signers)
7. [Tags](#tags)

### Before Install <a name="before-install"></a>

Before you start to install and code, you need to have access to:

- Public Key
- Secret Key
- UserID

<br/>

All of this things you can have access in our portal [Assin](https://portal.assin.com.br/).

## Installation <a name="installation"></a>

<br/>

To install our library:

```
  npm install osten-verse-sign
```

or

```
  yarn add osten-verse-sign
```

<br/>

## Configuration <a name="configuration"></a>

<br/>

To start the connection with API use this function:

```
  const assinApi = new Routers(yourPublicKey, yourUserId,
    yourSecretKey, 'http://localhost:3000/v1');
```

<br/>

## Documents <a name="documents"></a>

To list your Documents use this function:

```
  const allDocuments = await assinApi.listDocuments()
```

<br />

To create a new Document use this function:

```
  const document = await assinApi.createDocument({
    alias: 'name of document',
  });
```

<br/>

<br/>

## Envelopes <a name="envelopes"></a>

To list your Envelopes use this function:

```
  const allEnvelopes = await assinApi.listEnvelopes()
```

</br>

To Create a new Envelope use this function:

```
  const envelope = await assinApi.createEnvelope({
    title: 'name of envelope',
    description: 'description of envelope',
  });
```

<br/>

To Attach a Document in Envelope use this function:

```
  const addDocsInEnvelope = await assinApi.addDocumentsInEnvelope(envelope.id, [
    { id: document.id },
  ]);
```

<br/>

To Remove a Document of Envelope use this function:

```
  const removeDocsFromEnvelope = await assinApi.removeDocumentsInEnvelope(envelope.id, [
  { id: document.id },
  ]);
```

<br />

To Close Envelope use this function:

```
const closeEnvelope = await assinApi.closeEnvelope(envelope.id);
```

<br />

To Cancel Envelope use this function:

```
const cancelEnvelope = await assinApi.cancelEnvelope(envelope.id);
```

<br />

<br/>

## Signers <a name="signers"></a>

To Add a new signer in your Envelope use this function:

```
  const signer = await assinApi.createEnvelopeSigner(envelope.id, {
    fullName: 'Joe Doe',
    email: 'joedoe@email.com',
    signatureType: SignatureType.PARTY,
    requirePersonalDocument: false,
    requireEmailToken: false,
    order: 0,
  });
```

</br>

To Remove an signer from your Envelope use this function:

```
  const removeSigner = await assinApi.deleteEnvelopeSigner(envelope.id, {
    signerId: signer.signerId
  });
```

</br>

<br/>

## Tags <a name="tags"></a>

To Add a new tag to a signer in your Envelope use this function:

```
  const tag = await assinApi.createTag(envelope.id, {
    envelopeSignerId: signer.signerId,
    envelopeDocumentsId: document.id,
    angle: 0,
    elementType: ElementType.SIGNATURE,
    content: 'New Tag',
    axisX: 0,
    axisY: 0,
    page: 0,
  });
```

</br>

To Remove an signer from your Envelope use this function:

```
const removeTag = await assinApi.deleteTag(envelope.id, tag.id)
```

</br>

This API uses our library of filters, If you wanna use advanced filter see [more details](https://github.com/duaneoli/typeorm-nest-joi-parse).
