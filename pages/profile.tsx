import { GuessDisplayH } from "@/components/GuessDisplayH";
import Paginate from "@/lib/paginate";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { Container, Button } from "react-bootstrap";

const Profile = ({ history }: { history?: any }) => {

    const { data: session } = useSession();
    const [pageNumber, setPageNumber] = useState(1)

    return (
        <Container>
            <div className="text-center d-flex flex-wrap justify-content-center">
                <h3>Hello {session?.user?.email}! This is your game history:</h3>
            </div>

            {history ?
                <div>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                        <Button
                            disabled={pageNumber - 1 > 0 ? false : true}
                            onClick={() => {
                                if ((pageNumber - 1) > 0) {
                                    setPageNumber(pageNumber - 1)
                                }
                            }}>Prev. Page</Button>

                        <span>Page {pageNumber}/{history.length}</span>

                        <Button
                            disabled={pageNumber + 1 <= history.length ? false : true}
                            onClick={() => {
                                if (pageNumber + 1 <= history.length) {
                                    setPageNumber(pageNumber + 1)
                                }
                            }}>Next Page</Button>

                    </div>
                    <GuessDisplayH games={Paginate(history, 1, pageNumber)} />
                </div>
                :
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                    <h4>
                        No games found!
                    </h4>
                </div>
            }
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    }

    const getHistory = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
        method: 'GET',
        headers: {
            cookie: req.headers.cookie || ""
        }
    })

    const historyObj = await getHistory.json()
    var history = null
    if (historyObj.history) {
        history = historyObj.history.reverse()
    }

    return {
        props: {
            history,
            session
        }
    };
};

export default Profile;